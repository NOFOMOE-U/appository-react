import { setRemoteUrlResolver } from '@appository/shared/load-remote-module';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SharedRemotesProps {}

const StyledSharedRemotes = styled.div`
  color: pink;
`
  export const SharedRemotes = async () => {
      // fetch the module-federation.manifest.json file
      const response = await fetch('./module-federation.manifest.json');
      const manifest = await response.json();
  
      // extract the remotes from the manifest
      const { remotes } = manifest;
  
      // create a function that takes in a remote name and returns the URL
      // to the remote's module-federation.manifest.json file
      const remoteUrlResolver = (remoteName: string) => {
          return remotes[remoteName];
      }
      setRemoteUrlResolver(remoteUrlResolver);
  }


export default SharedRemotes
