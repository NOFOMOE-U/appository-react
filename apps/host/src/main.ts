import { fetchRemotes } from '@appository/shared/fetch-remotes';
import { setRemoteUrlResolver } from '@appository/shared/load-remote-module';
import { SharedRemotes } from '@appository/shared/remotes';

const remotes = await fetchRemotes();
const remoteUrlResolver = (remoteName: string) => {
    return remotes[remoteName];
}
setRemoteUrlResolver(remoteUrlResolver);

SharedRemotes();
import('./bootstrap')
  .catch((err) => console.error(err))
