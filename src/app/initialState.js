const initialState = {
  menu: {
    action: 'order',
    group: 0,
  },
  data: {
    groups: [0],
    loaded: 'false',
    faceUp: 'english',
    selection: {
      chinese: '',
      english: '',
    },
    dataArray: [],
    randomised: [],
    remoteData: [],
    tempData: [
      {
        group_id: 0,
        id: 0,
        english: '',
        chinese: '',
      },
    ],
  },
}

export default initialState
