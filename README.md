![Version](https://img.shields.io/badge/version-1.2.2-blue.svg?cacheSeconds=2592000)

# strapi-parse

strapi-parse is an NPM package that can be used to parse Strapi V4 API responses into easier to work with objects.

## Usage

```sh
$ npm i --save strapi-parse
```

```javascript
import { strapiParse } from "strapi-parse";

const parsedAPIResponse = strapiParse(strapiAPIResponse);
```

## Examples
> strapi-parse does not currently support getting data from the meta properties
### Collection Type
```javascript
// Strapi API Response
{
  data: [
    {
      id: 1,
      attributes: {
        title: "Test Article",
        slug: "test-article",
        // ...
      }
    },
    {
      id: 2,
      attributes: {
        title: "Test Article 2",
        slug: "test-article-2",
        // ...
      }
    }
  ],
  meta: {
    // ...
  }
}

// strapi-parse Output
[
  {
    id: 1
    title: "Test Article",
    slug: "test-article",
    // ...
  },
  {
    id: 2
    title: "Test Article 2",
    slug: "test-article-2",
    // ...
  }
]
```
### Single Type
```javascript
// Strapi API Response
{
  data: {
      id: 1,
      attributes: {
          title: "Test Article",
          slug: "test-article",
          // ...
      },
      meta: {
          availableLocales: []
      }
  },
  meta: { }
}

// strapi-parse Output
{
  id: 1
  title: "Test Article",
  slug: "test-article",
  // ...
}
```

## Author
Joshua Henry - [@jch-code](https://github.com/jch-code)

## License
[MIT License](https://github.com/jch-code/strapi-parse/blob/main/LICENSE)
