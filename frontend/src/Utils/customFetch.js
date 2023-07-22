/*let isOk = true;

const customFetch = (time, task, category) => {
  return new Promise ((resolve, reject) => {
      setTimeout(() => {
        let items = category ? (task.filter( item => item.category === category)) : task

          if(isOk) {
              resolve(items);
          } else {
              reject('Error');
          }
      }, time)
  })
}

export default customFetch*/