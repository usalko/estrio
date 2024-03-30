// import {DateISOString, DateYMD, XAmzDate } from "./types";

// export const dateISOString: DateISOString = new Date(+new Date() + 864e5).toISOString();
// export const xAmzDate: XAmzDate =  dateISOString.split("-").join("").split(":").join("").split(".").join("");
// export const dateYMD: DateYMD = dateISOString.split("T")[0].split("-").join("");


// import { IConfig } from "./types";

// export const throwError = (config: IConfig, file: File) => {
//   if (config.bucketName === null || config.bucketName === "") {
//     throw new Error(`Your bucketName cannot be empty `);
//   }
//   if (config.region === null || config.region === "") {
//     throw new Error(`Must provide a valide region in order to use your bucket`);
//   }
//   if (config.accessKeyId === null || config.accessKeyId === "") {
//     throw new Error(`Must provide accessKeyId`);
//   }
//   if (config.secretAccessKey === null || config.secretAccessKey === "") {
//     throw new Error(`Must provide secretAccessKey`);
//   }
//   if (!file) {
//     throw new Error(`File cannot be empty`);
//   }
// };


// import { dateISOString, dateYMD, xAmzDate } from "./Date";
// import { IConfig, Policy as PolicyType } from "./types";

// export default class Policy {
//   public static getPolicy(config: IConfig): string {
//     const policy = (): PolicyType => {
//       return {
//         expiration: dateISOString,
//         conditions: [
//           { acl: "public-read" },
//           { bucket: config.bucketName },
//           ["starts-with", "$key", `${config.dirName ? config.dirName + "/" : ""}`],
//           ["starts-with", "$Content-Type", ""],
//           ["starts-with", "$x-amz-meta-tag", ""],
//           { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
//           {
//             "x-amz-credential": `${config.accessKeyId}/${dateYMD}/${
//               config.region
//             }/s3/aws4_request`
//           },
//           { "x-amz-date": xAmzDate },
//           { "x-amz-meta-uuid": "14365123651274" },
//           { "x-amz-server-side-encryption": "AES256" }
//         ]
//       };
//     };
//     //Returns a base64 policy;
//     return new Buffer(JSON.stringify(policy())).toString("base64").replace(/\n|\r/, "");
//   };
// };

// import shortId from 'short-uuid';
// import { dateYMD, xAmzDate } from "./Date";
// import { IConfig, DeleteResponse, UploadResponse } from "./types";
// import { throwError } from "./ErrorThrower";
// import GetUrl from "./Url";
// import Policy from "./Policy";
// import Signature from "./Signature";

// class ReactS3Client {
//     private config: IConfig;
//     constructor(config: IConfig) {
//       this.config = config;
//     }
//     public async uploadFile(file: File, newFileName?: string): Promise<UploadResponse> {
//       throwError(this.config, file);

//       const fd = new FormData();
//       const fileName: string = this.getFileNameWithExtension(file, newFileName);
//       const key: string = `${this.config.dirName ? this.config.dirName + "/" : ""}${fileName}`;
//       const url: string = GetUrl(this.config);
//       fd.append("key", key);
//       fd.append("acl", "public-read");
//       fd.append("Content-Type", file.type);
//       fd.append("x-amz-meta-uuid", "14365123651274");
//       fd.append("x-amz-server-side-encryption", "AES256");
//       fd.append(
//           "X-Amz-Credential",
//           `${this.config.accessKeyId}/${dateYMD}/${this.config.region}/s3/aws4_request`
//       );
//       fd.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
//       fd.append("X-Amz-Date", xAmzDate);
//       fd.append("x-amz-meta-tag", "");
//       fd.append("Policy", Policy.getPolicy(this.config));
//       fd.append(
//           "X-Amz-Signature",
//           Signature.getSignature(this.config, dateYMD, Policy.getPolicy(this.config))
//       );
//       fd.append("file", file);

//       const data = await fetch(url, { method: "post", body: fd });
//       if (!data.ok) return Promise.reject(data);
//       return Promise.resolve({
//         bucket: this.config.bucketName,
//         key: `${this.config.dirName ? this.config.dirName + "/" : ""}${fileName}`,
//         location: `${url}/${this.config.dirName ? this.config.dirName + "/" : ""}${fileName}`,
//         status: data.status
//       });
//     }
//     public async deleteFile(fileName: string): Promise<DeleteResponse> {
//       const url: string = `https://${this.config.bucketName}.s3${
//         this.config.region ? "-" + this.config.region : ""
//         }.amazonaws.com/${
//         this.config.dirName ? this.config.dirName + "/" : ""
//         }${fileName}`;

//       const deleteResult = await fetch(url, { method: "delete" });
//       if (!deleteResult.ok) return Promise.reject(deleteResult);
//       return Promise.resolve({
//         ok: deleteResult.ok,
//         status: deleteResult.status,
//         message: "File Deleted",
//         fileName: fileName
//       });
//     }
//     private getFileNameWithExtension(file: File, newFileName?: string): string {
//       if (newFileName && newFileName.includes(".")) {
//         return newFileName;
//       }
//       return `${newFileName || shortId.generate()}.${file.type.split("/")[1]}`;
//     }
// }

// export default ReactS3Client;

// import {IConfig, DateYMD} from "./types"
// import Crypto, { WordArray } from "crypto-js";

// export default class Signature {
//     public static getSignature(config: IConfig, date: DateYMD, policyBase64: string): string {
//         const getSignatureKey = (key: string, dateStamp: DateYMD, regionName: string): WordArray => {
//             const kDate: WordArray = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
//             const kRegion: WordArray = Crypto.HmacSHA256(regionName, kDate);
//             const kService: WordArray = Crypto.HmacSHA256("s3", kRegion);
//             const kSigning: WordArray = Crypto.HmacSHA256("aws4_request", kService);
//             return kSigning;
//         };
//         const signature = (policyEncoded: string): string => {
//             return Crypto.HmacSHA256(
//                 policyEncoded,
//                 getSignatureKey(config.secretAccessKey, date, config.region)
//             ).toString(Crypto.enc.Hex);
//         };
//         return signature(policyBase64);
//     }
// }

// export type DateISOString = string; // "2019-01-27T11:07:43.102Z"
// export type XAmzDate = string; // "20190127T110743102Z"
// export type DateYMD = string; // "20190127"

// export interface IConfig {
//   bucketName: string,
//   dirName?: string,
//   region: string
//   accessKeyId: string,
//   secretAccessKey: string,
//   s3Url?: string
// };

// type GenericType = {
//   [key: string]: string
// };

// type Conditions = [
//   GenericType,
//   GenericType,
//   string[],
//   string[],
//   string[],
//   GenericType,
//   GenericType,
//   GenericType,
//   GenericType,
//   GenericType
// ];

// export type Policy = {
//   conditions: Conditions,
//   expiration: DateISOString
// };

// export type UploadResponse = {
//   bucket: string,
//   key: string,
//   location: string,
//   status: number
// };

// export type DeleteResponse = {
//   ok: boolean,
//   status: number,
//   message: string,
//   fileName: string
// };

// import { IConfig } from "./types";

// const buildUrl = ({bucketName, region}: IConfig): string => {
//   const countryCode = region.split("-")[0];

//   switch (countryCode) {
//     case "cn":
//       return `https://${bucketName}.s3.${region}.amazonaws.com.${countryCode}`;
//     default:
//       return `https://${bucketName}.s3-${region}.amazonaws.com`;
//   }
// }

// export default (config: IConfig): string => {
//   if (config.s3Url && config.s3Url !== '') {
//     return config.s3Url;
//   }

//   return buildUrl(config);
// }
