export type SourceTree = {
	root: SourceTreeNode;
};

export type SourceTreeBranch = {
	parent: SourceTreeBranch | undefined;
	type: 'branch';
	name: string;
	children: SourceTreeNode[];
};

export type SourceTreeLeaf = {
	parent: SourceTreeBranch | undefined;
	type: 'leaf';
	name: string;
};

export type SourceTreeNode = SourceTreeBranch | SourceTreeLeaf;
