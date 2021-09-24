import React from 'react';
import { observer } from 'mobx-react';
import onlineRequestReducer from './OnlineRequestReducer';
import './onlineRequestStyles.scss';

const OnlineRequest: React.FC = () => {
  const state = onlineRequestReducer.state;

  return (
    <div
      className={'OnlineRequest ' + (state.activateOnlineRequest ? 'activateOnlineRequest' : '')}
    >
      <div
        className="CloseOnline closeButton"
        onClick={() => {
          state.activateOnlineRequest = false;
          state.activateThanksOnline = false;
        }}
      >
        <i className="fas fa-times"></i>
      </div>
      <form
        className={state.activateThanksOnline ? 'closeWindow' : 'openWindowFlex'}
        onSubmit={(e) => onlineRequestReducer.sendOnlineRequest(e)}
      >
        <h1>Запишись на занятия онлайн!</h1>
        <label htmlFor="NameOnline">Имя</label>
        <input
          onChange={(e) => {
            state.requestData.name = e.target.value;
          }}
          name="Name"
          id="NameOnline"
          type="text"
          placeholder="Введите имя"
          required
        />
        <label htmlFor="PhoneOnline">Телефон</label>
        <input
          onChange={(e) => {
            state.requestData.phone = e.target.value;
          }}
          name="Phone"
          id="PhoneOnline"
          type="phone"
          placeholder="Введите телефон"
          required
        />
        <label htmlFor="AgeOnline">Возраст</label>
        <input
          onChange={(e) => {
            state.requestData.age = e.target.value;
          }}
          name="Age"
          id="AgeOnline"
          type="number"
          placeholder="Введите возраст"
          required
        />
        <button type="submit" className="SendOnlineRequest button">
          Отправить
        </button>
      </form>
      <h1 className={'ThanksOnline ' + (state.activateThanksOnline ? 'openWindow' : 'closeWindow')}>
        Спасибо за запись!
        <br />
        Мы свяжемся с вами в ближайшее время!
      </h1>
    </div>
  );
};

export default observer(OnlineRequest);
