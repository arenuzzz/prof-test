export const mockCard = {
  id: 946,
  initials: 'Максим Глек',
  phoneNumber: '+3 (806) 742-37011',
  type: 'VIBER',
  nickname: '@arenuzzz',
  avatarLink: 'http://46.101.98.38:8080/public/263711875_71143.jpg',
  isBackground: false,
  isTracked: false,
  messagesCount: 10,
};

let j = 0;

const getProfilesResults = (params) => {
  const content: Array<typeof mockCard> = [];

  for (let i = 0; i < 10; i++) {
    content.push({
      ...mockCard,
      id: i,
      isTracked: i === 2 && j === 1,
      isBackground: true,
    });
  }

  j++;

  return Promise.resolve({
    data: {
      content,
      totalElements: 10,
      totalPages: 1,
      pageNumber: j,
      pageSize: 10,
    },
  });
};

const getGroupProfilesAutocompleteResults = (params) => {
  const content: Array<typeof mockCard> = [];

  for (let i = 0; i < 10; i++) {
    content.push({
      ...mockCard,
      id: i,
      isTracked: i === 2 && j === 1,
      isBackground: true,
    });
  }

  // j++;

  return Promise.resolve({
    data: {
      content,
      totalElements: 10,
      totalPages: 1,
      pageNumber: 1,
      pageSize: 10,
    },
  });
};

export const mockApi = {
  getProfilesResults,
  getGroupProfilesAutocompleteResults,
};
