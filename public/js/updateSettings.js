/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/v1/users/updateMyPassword'
        : 'http://localhost:3000/api/v1/users/updateMe';

    console.log(url);
    console.log(data);
    console.log(type);

    const res = await axios({
      method: 'PATCH',
      url,
      data: data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      //reload
      // window.setTimeout(() => {
      //   location.reload();
      // }, 1500);
    }

    console.log(res.data);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
