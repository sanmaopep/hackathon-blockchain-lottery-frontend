import { observable } from 'mobx';

export interface Block {}

class BlockBrowserState {
  @observable blockList: Block[] = [];
  @observable title = 'title';
}

const blockBrowserState = new BlockBrowserState();
export default blockBrowserState;
