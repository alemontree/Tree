var Tree = function(value){
  this.value = value;
  this.children = [];
};

Tree.prototype.DFSelect = function(filter) {      
  //YOUR CODE HERE
  var result = [];

  var recurse = function(child) {
    if (filter(this.value)) {
      result.push(this.value);
    } 
  //console.log(this.children.length);
    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++ ) {
        recurse(this.children[i]);

        //result.push(this.children[i].recurse());
      }
    }
  }


  return result;
};

Tree.prototype.addChild = function(child){
  if (!child || !(child instanceof Tree)){
    child = new Tree(child);
  }
  if(!this.isDescendant(child)){
    this.children.push(child);
  }else {
    throw new Error("That child is already a child of this tree");
  }
  // return the new child node for convenience
  return child;
};

Tree.prototype.isDescendant = function(child){
  if(this.children.indexOf(child) !== -1){
    // `child` is an immediate child of this tree
    return true;
  }else{
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].isDescendant(child)){
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

Tree.prototype.removeChild = function(child){
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};


var all = function () { return true; };

var root = new Tree(1);

root.addChild(2);
root.addChild(3);

root.children[0].addChild(4);
root.children[0].addChild(5);
root.children[1].addChild(6);
root.children[1].addChild(7);

root.children[0].children[0].addChild(8);
root.children[1].children[1].addChild(9);
var expected = [1, 2, 4, 8, 5, 3, 6, 7, 9];
console.log(expected);
var result = root.DFSelect(all);

// assert.deepEqual(result, expected);
console.log(result);


