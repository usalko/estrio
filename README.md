# TODO

guide [https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe]
possible tests

``` txt
    "test": "npm run build && tape test/*.js && jsmd readme.md && npm run test:typescript",
    "test:typescript": "tsc --noEmit test/typescript.ts && ts-node test/typescript.ts",
    "size": "npm run build && uglifyjs --compress --mangle -- ./dist/umd.js | gzip -c | wc -c"
```
