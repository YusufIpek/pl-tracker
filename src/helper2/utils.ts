export function removeIdAttribute<T>(obj: T): T {
  const result = Object.assign({}, obj);
  if ('id' in result) {
    delete result['id'];
  }
  return result;
}
