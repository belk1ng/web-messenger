type CriteriaReturnType = string;
type GroupByAccumulator<T> = Record<CriteriaReturnType, T[]>;

const groupBy = <T>(
  collection: T[],
  criteria: (value: T) => CriteriaReturnType
) => {
  return collection.reduce((acc: GroupByAccumulator<T>, curr: T) => {
    const _key = criteria(curr);

    if (_key in acc) {
      acc[_key].push(curr);
    } else {
      acc[_key] = [curr];
    }

    return acc;
  }, {});
};

export default groupBy;
