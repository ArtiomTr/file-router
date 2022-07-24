import { SourceTree, SourceTreeBranch, SourceTreeLeaf, SourceTreeNode } from './SourceTree';

export type ParseOptions<T> = {
	getChildren: (value: T) => Array<T> | Promise<Array<T>>;
	getName: (value: T) => Promise<string> | string;
};

export const parseSourceTree = async <T>(input: T, options: ParseOptions<T>): Promise<SourceTree> => {
	type QueueItem = {
		item: T;
		parent: SourceTreeBranch | undefined;
	};

	const tree: SourceTree = {} as SourceTree;

	const queue: QueueItem[] = [{ item: input, parent: undefined }];

	while (queue.length >= 0) {
		const { item, parent } = queue.shift()!;
		const children = await options.getChildren(item);
		const name = await options.getName(item);

		let node: SourceTreeNode;
		if (children.length > 0) {
			const currentNode: SourceTreeBranch = {
				type: 'branch',
				name,
				parent,
				children: [],
			};

			queue.push(...children.map((child) => ({ item: child, parent: currentNode })));
			node = currentNode;
		} else {
			node = {
				type: 'leaf',
				name,
				parent,
			};
		}

		if (parent === undefined) {
			tree.root = node;
		} else {
			parent.children.push(node);
		}
	}

	return tree;
};
