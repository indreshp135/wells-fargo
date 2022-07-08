import { store } from '../store';
import { APPROVAL_REQUIRED, PERMISSION_DENIED } from '../actionTypes/AccessTypes';

// Filter folders and don't display folders with all actions as PERMISSION_DENIED
export function filterAssetAccess(folders) {
  const { accessList } = store.getState().access;
  const filteredList = [];

  folders.forEach((folder) => {
    const name = folder.folder_name.toUpperCase();
    const curAsset = accessList.allowed[name];
    let flag = false;

    const keys = Object.keys(curAsset);

    for (let i = 0; i < keys.length; i += 1) {
      if (curAsset[keys[i]] !== PERMISSION_DENIED) {
        flag = true;
        break;
      }
    }

    if (flag) {
      filteredList.push(folder);
    }
  });

  return filteredList;
}

// Util function for each asset action combination
export function checkActionAccess(action, asset) {
  const { accessList } = store.getState().access;
  if (accessList.allowed[asset][action] === PERMISSION_DENIED) return 0;
  if (accessList.allowed[asset][action] === APPROVAL_REQUIRED) return 1;
  return 2;
}
