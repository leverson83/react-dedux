import React from 'react'
import firebase from 'firebase/compat/app'

// export function getData() {
//   const ref = firebase.firestore().collection('words')
//   const [data, setData] = useState([])
//   const [loader, setLoader] = useState(true)

//   const getData = () => {
//     ref.onSnapshot((querySnapshot) => {
//       const items = []
//       querySnapshot.forEach((word) => {
//         items.push(word.data())
//       })
//       setData(items)
//       setLoader(false)
//     })
//   }

//   useEffect(() => {
//     getData()
//   }, [])

//   return data
// }
