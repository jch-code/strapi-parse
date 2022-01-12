/*
Collections types in Strapi return in the following format
  {
    data [
    {
      attributes: {
        createdAt: ""
        updatedAt: ""
        },
      id: 0
    },
      ...
    ]
  }

Single types in Strapi return in the following format
{
  data {
    attributes: {
      createdAt: ""
      updatedAt: ""
    },
    id: 0
  }
}

Components in Strapi do not follow the above format, but instead 
return as a simple object, Ex:
  {
    id: 0
    title: ""
    description: ""
  }

Dynamic Zones in Strapi also do not follow the standard content
type format, but instead return as a simple array of components
  [
    {
      id: 0
      title: ""
      description: ""
    },
    ...
  ]
*/
function strapiParse(strapiResponse) {
  if (Array.isArray(strapiResponse.data))
    return parseCollection(strapiResponse);
  else if (Array.isArray(strapiResponse))
    return parseCollection(strapiResponse);

  return parseSingle(strapiResponse);
}

function parseCollection(collection) {
  /*
   If collection.data is undefined, this must be a dynamic zone, 
   so we set data to collection instead of collection.data
  */
  var data = collection.data || collection;

  data = data.map(entity => {

    var obj = {
      id: entity.id
    }

    /*
     If entity.attributes is undefined, this mist be a component,
     so we create an attributes field on the object and set it to the 
     object itself.

     This is done so the component is compatible with the parsing logic below
     that was written for the standard format.
    */
    if (!entity.attributes) {
      entity = {
        attributes: entity
      }
    }

    var attributes = Object.getOwnPropertyNames(entity.attributes)

    attributes.forEach(attr => {
      if (entity.attributes[attr] == null) {
        obj[attr] = null
      } else {
        obj[attr] = strapiParse(entity.attributes[attr])

        /*
         If the attrbute is a one-choice Strapi relationship, and the 
         relationship is not set, the format is
         
          {
            data: null
          }

          In this case, we just set the property to null.
        */
        if (entity.attributes[attr].data === null) {
          obj[attr] = null;
        }
      }
    });

    return obj
  })

  return data;
}

function parseSingle(entity) {
  /*
   If the entity does not have the data property, it is either
   a Strapi component or just an attribute field so we return the entity.
  */
  if (!entity.data) return entity

  var attributes = Object.getOwnPropertyNames(entity.data.attributes)

  var obj = {
    id: entity.id
  }

  attributes.forEach(attr => {
    if (entity.data.attributes[attr] == null) {
      obj[attr] = null
    } else {
      obj[attr] = strapiParse(entity.data.attributes[attr])

      /*
         If the attrbute is a one-choice Strapi relationship, and the 
         relationship is not set, the format is
         
          {
            data: null
          }

          In this case, we just set the property to null.
        */
      if (entity.data.attributes[attr].data === null) {
        obj[attr] = null;
      }
    }
  });

  return obj
}

module.exports = {
  strapiParse,
  default: strapiParse
}