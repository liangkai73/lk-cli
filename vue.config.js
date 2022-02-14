const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: "/",
    css: {
        loaderOptions: {
            sass: {
                alias: {
                    "@": resolve("./src")
                }
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                // data: `@import "~@/components/style/index";`
            },
            stylus: {
                alias: {
                    "@": resolve("./src")
                }
            }
        }
    }
}