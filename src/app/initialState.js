import mockData from '../data/mockData.json'

const initialState = {
  menu: {
    action: '',
  },
  content: {
    activeContent: 'landing',
  },
  data: {
    dataArray: [],
    remoteData: mockData,
  },
}

export default initialState
