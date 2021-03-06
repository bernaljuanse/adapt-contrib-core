import Adapt from 'core/js/adapt';
import wait from 'core/js/wait';
import Data from 'core/js/data';
import AdaptSubsetCollection from 'core/js/collections/adaptSubsetCollection';
import ContentObjectModel from 'core/js/models/contentObjectModel';
import ArticleModel from 'core/js/models/articleModel';
import BlockModel from 'core/js/models/blockModel';
import ComponentModel from 'core/js/models/componentModel';
import logging from 'core/js/logging';

import 'core/js/models/courseModel';
import 'core/js/models/menuModel';
import 'core/js/models/pageModel';
import 'core/js/views/pageView';
import 'core/js/views/articleView';
import 'core/js/views/blockView';

class MPABC extends Backbone.Controller {

  initialize() {
    // Example of how to cause the data loader to wait for another module to setup
    this.listenTo(Data, {
      loading: this.waitForDataLoaded,
      loaded: this.onDataLoaded
    });
    this.setupSubsetCollections();
  }

  waitForDataLoaded() {
    // Tell the data loader to wait
    wait.begin();
  }

  onDataLoaded() {
    // Tell the data loader that we have finished
    wait.end();
  }

  setupSubsetCollections() {
    Adapt.contentObjects = new AdaptSubsetCollection(null, { parent: Data, model: ContentObjectModel });
    Adapt.articles = new AdaptSubsetCollection(null, { parent: Data, model: ArticleModel });
    Adapt.blocks = new AdaptSubsetCollection(null, { parent: Data, model: BlockModel });
    Adapt.components = new AdaptSubsetCollection(null, { parent: Data, model: ComponentModel });
  }

}

const mpabc = new MPABC();

Object.defineProperty(Adapt, 'mpabc', {
  get() {
    logging.deprecated('Adapt.mpabc, please use core/js/mpabc directly');
    return mpabc;
  }
});

export default mpabc;
