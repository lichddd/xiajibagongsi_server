
class Sort{
  static next(list,sortfield="sort")
  {
    let max_sort=1;
    if (list) {
      max_sort=list.orderBy(sortfield,"desc").take(1).value()[0];
      if (!max_sort) {
        max_sort=1;
      }
      else
      {
        max_sort=max_sort.sort+1;
      }
    }
    return max_sort;
  }

}
export default Sort;
