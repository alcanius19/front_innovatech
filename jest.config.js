module.exports = {
  projects: [
    {
      displayName: "dom",
      testEnvironment: "jsdom",
      snapshotSerializers: ["enzyme-to-json/serializer"],
      testMatch: ["**/*/**/*.test.js?(x)"],
      preset: "ts-jest",
      roots: ["<rootDir>/src"],
      transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      moduleNameMapper: {
        "^@/(.*svg)(\\?inline)$": "<rootDir>/src/$1",
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|web|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$":
          "<rootDir>/__mocks__/fileMock.js",
        ".(css|less|sass|scss)$": "identity-obj-proxy",
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      modulePathIgnorePatterns: ["<rootDir>/react-bootstrap-table2/"],
      snapshotSerializers: ["enzyme-to-json/serializer"],
      setupFiles: ["./setupTests.js"],
    },
    {
      displayName: "node",
      testEnvironment: "node",
      snapshotSerializers: ["enzyme-to-json/serializer"],
      testMatch: ["**/*/**/*.test.node.js?(x)"],
      preset: "ts-jest",
      roots: ["<rootDir>/src"],
      transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      moduleNameMapper: {
        "^@/(.*svg)(\\?inline)$": "<rootDir>/src/$1",
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|web|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$":
          "<rootDir>/__mocks__/fileMock.js",
        ".(css|less|sass|scss)$": "identity-obj-proxy",
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      modulePathIgnorePatterns: ["<rootDir>/react-bootstrap-table2/"],
      snapshotSerializers: ["enzyme-to-json/serializer"],
      setupFiles: ["./setupTests.js"],
    },
  ],
};
