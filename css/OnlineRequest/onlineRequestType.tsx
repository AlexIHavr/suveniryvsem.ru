type requestDataType = {
  name: string;
  phone: string;
  age: string;
};

export type onlineRequestType = {
  activateOnlineRequest: boolean;
  activateThanksOnline: boolean;
  activatePreloader: boolean;
  requestData: requestDataType;
};
