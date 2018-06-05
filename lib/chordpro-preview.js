'use babel';

import ChordproPreviewView from './chordpro-preview-view';
import { CompositeDisposable } from 'atom';

export default {

  chordproPreviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.chordproPreviewView = new ChordproPreviewView(state.chordproPreviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.chordproPreviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chordpro-preview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.chordproPreviewView.destroy();
  },

  serialize() {
    return {
      chordproPreviewViewState: this.chordproPreviewView.serialize()
    };
  },

  toggle() {
    console.log('ChordproPreview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
