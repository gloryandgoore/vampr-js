class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }


  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }


  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVamp = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVamps++;
    }

    return numberOfVamps;
  }


  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const rankVamp1 = this.numberOfVampiresFromOriginal;
    const rankVamp2 = vampire.numberOfVampiresFromOriginal;
    if (rankVamp2 > rankVamp1) {
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (let vampYute of this.offspring) {
      let vampire = vampYute.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }

    return null;
  }

  // // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (let vampYute of this.offspring) {
      count += vampYute.totalDescendents + 1;
    }
    return count;
  }

  // // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];
    if (this.yearConverted > 1980) {
      vampires.push(this);
    }

    for (let vampYute of this.offspring) {
      vampires = vampires.concat(vampYute.allMillennialVampires);
    }
    
    return vampires;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  getAllAncestors() {
    let currentAncestors = [];
    for(let coven = this; (coven); coven = coven.creator) {
      currentAncestors.push(coven);
    }
    return currentAncestors;
  }

  closestCommonAncestor(vampire) {
    let currentAncestors = this.getAllAncestors();
    let vampyAncestors = vampire.getAllAncestors();
    for(const currentAncestor of currentAncestors) {
      if(!currentAncestor) return;
      for (const vampyAncestor of vampyAncestors) {
        if (!vampyAncestor) return;
        if (currentAncestor.name === vampyAncestor.name) {
          return currentAncestor;
        }
      }
    }

  }
}



module.exports = Vampire;

