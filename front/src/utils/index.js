export const onCheckSize = (arr, setSize, setCheckSize) => {
  for (let i = 0; i < arr.sizes.length; i++) {
    if (arr.sizes[i].avalible) {
      setSize(arr.sizes[i].size)
      return setCheckSize(true)
    }}}