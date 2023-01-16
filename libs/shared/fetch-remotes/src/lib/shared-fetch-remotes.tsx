import { setRemoteUrlResolver } from '@appository/shared/load-remote-module';
/* eslint-disable-next-line */

  export const fetchRemotes = async () => {
    const response = await fetch('./module-federation.manifest.json');
    const manifest = await response.json();
    const { remotes } = manifest;
    return remotes;
  }

const setupRemotes = async () => {
  const remotes = await fetchRemotes();
  const remoteUrlResolver = (remoteName: string) => {
      return remotes[remoteName];
  }
  setRemoteUrlResolver(remoteUrlResolver);
}

setupRemotes();

export default fetchRemotes
