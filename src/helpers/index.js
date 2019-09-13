import { auth } from '../firebase';

export const resolveUser = _ =>
  new Promise((resolve, reject) => auth.onAuthStateChanged(user => resolve(user), reject));

export const getCurrentUser = async _ => {
  const currentUser = await resolveUser();
  if (!currentUser) return {};
  const token = await currentUser.getIdToken();
  return { token, currentUser };
};

export const isLoggedIn = _ => !!sessionStorage.getItem('Auth');

const images = [
  'http://treehouse-code-samples.s3.amazonaws.com/bootstrap-4/img/angie.png',
  'http://treehouse-code-samples.s3.amazonaws.com/bootstrap-4/img/nodestradamus.png',
  'http://treehouse-code-samples.s3.amazonaws.com/bootstrap-4/img/geo.png',
  'http://treehouse-code-samples.s3.amazonaws.com/bootstrap-4/img/ecma.png',
  'http://treehouse-code-samples.s3.amazonaws.com/bootstrap-4/img/jay.png',
  'http://treehouse-code-samples.s3.amazonaws.com/bootstrap-4/img/json.png'
];

export const getProfilePicture = _ => images[Math.floor(Math.random() * images.length)];
