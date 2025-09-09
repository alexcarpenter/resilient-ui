// @ts-nocheck -- skip type checking
import * as docs_0 from "../content/docs/index.mdx?collection=docs&hash=1757455391779"
import * as changelog_0 from "../content/changelog/example.mdx?collection=changelog&hash=1757455391779"
import * as blog_0 from "../content/blog/example.mdx?collection=blog&hash=1757455391779"
import { _runtime } from "fumadocs-mdx"
import * as _source from "../source.config"
export const blog = _runtime.doc<typeof _source.blog>([{ info: {"path":"example.mdx","absolutePath":"/Users/alexcarpenter/repos/resilient-ui/content/blog/example.mdx"}, data: blog_0 }]);
export const changelog = _runtime.doc<typeof _source.changelog>([{ info: {"path":"example.mdx","absolutePath":"/Users/alexcarpenter/repos/resilient-ui/content/changelog/example.mdx"}, data: changelog_0 }]);
export const docs = _runtime.doc<typeof _source.docs>([{ info: {"path":"index.mdx","absolutePath":"/Users/alexcarpenter/repos/resilient-ui/content/docs/index.mdx"}, data: docs_0 }]);
export const meta = _runtime.meta<typeof _source.meta>([]);