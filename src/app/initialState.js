const initialState = {
  menu: {
    action: 'order',
    group: 0,
  },
  content: {
    activeContent: 'landing',
    pullDown: false,
  },
  data: {
    loaded: 'false',
    showEnglish: true,
    dataArray: [],
    remoteData: [],
    tempData: [{ group_id: '', id: 1, english: '', chinese: '' }],
  },
}

export default initialState
