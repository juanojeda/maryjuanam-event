const flattenArrayToObject = (acc, curr) => ({ ...acc, ...curr });

const parseFirebaseValue = ([key, valueObject]) => {
  const value = valueObject.stringValue || valueObject.nullValue || valueObject.booleanValue;

  return { [key]: value };
};

const firebaseFieldsToDoc = doc => Object.entries(doc.fields)
  .map(parseFirebaseValue)
  .reduce(flattenArrayToObject, {});

export default firebaseFieldsToDoc;
