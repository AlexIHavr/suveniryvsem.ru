import { makeAutoObservable } from 'mobx';
import api from '../../../api/api';
import React from 'react';
import { onlineRequestType } from './onlineRequestType';

class OnlineRequestReducer {
  constructor() {
    makeAutoObservable(this);
  }

  state: onlineRequestType = {
    activateOnlineRequest: false,
    activateThanksOnline: false,
    activatePreloader: false,
    requestData: {
      name: '',
      phone: '',
      age: '',
    },
  };

  //отправка на mail онлайн запись на занятие
  async sendOnlineRequest(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    this.state.activatePreloader = true;

    const response = await api.post('/sendOnlineMail', this.state.requestData);
    if (response.status === 200) {
      this.state.activateThanksOnline = true;
    } else {
      console.log(response);
    }

    this.state.activatePreloader = false;
  }
}

export default new OnlineRequestReducer();
