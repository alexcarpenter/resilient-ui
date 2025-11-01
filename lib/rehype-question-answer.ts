import type { Root, Element, ElementContent, Text } from "hast"
import type { MdxJsxFlowElementHast, MdxJsxAttribute } from "mdast-util-mdx-jsx"

/**
 * Rehype plugin that transforms QuestionAnswer components containing h3 elements
 * into QuestionAnswer components with QuestionAnswerItem children.
 *
 * Transforms:
 * <QuestionAnswer title="...">
 *   ### Question 1
 *   Answer content...
 *   ### Question 2
 *   Answer content...
 * </QuestionAnswer>
 *
 * Into:
 * <QuestionAnswer title="...">
 *   <QuestionAnswerItem title="Question 1">
 *     Answer content...
 *   </QuestionAnswerItem>
 *   <QuestionAnswerItem title="Question 2">
 *     Answer content...
 *   </QuestionAnswerItem>
 * </QuestionAnswer>
 */
export function rehypeQuestionAnswer() {
  return (tree: Root) => {
    visit(tree)
  }
}

/**
 * Recursively visits nodes in the tree
 */
function visit(node: Root | ElementContent): void {
  // Check if this is a QuestionAnswer MDX component
  if (
    node.type === "mdxJsxFlowElement" &&
    (node as MdxJsxFlowElementHast).name === "QuestionAnswer"
  ) {
    transformQuestionAnswer(node as MdxJsxFlowElementHast)
  }

  // Recursively visit children
  if ("children" in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      visit(child as ElementContent)
    }
  }
}

/**
 * Transforms a QuestionAnswer component's children
 */
function transformQuestionAnswer(node: MdxJsxFlowElementHast): void {
  const children = node.children
  const newChildren: ElementContent[] = []
  let currentQuestion: string | null = null
  let currentContent: ElementContent[] = []

  for (const child of children) {
    // Check if this is an h3 heading
    if (
      child.type === "element" &&
      (child as Element).tagName === "h3" &&
      Array.isArray((child as Element).children)
    ) {
      // If we have a previous question, save it as a QuestionAnswerItem
      if (currentQuestion !== null) {
        newChildren.push(
          createQuestionAnswerItem(currentQuestion, currentContent)
        )
        currentContent = []
      }

      // Extract the text content from the h3
      currentQuestion = extractTextContent(child as Element)
    } else if (
      // Skip empty text nodes (whitespace only)
      child.type === "text" &&
      (child as Text).value.trim() === ""
    ) {
      continue
    } else {
      // Accumulate content for the current question
      if (currentQuestion !== null) {
        currentContent.push(child)
      }
    }
  }

  // Don't forget the last question/answer pair
  if (currentQuestion !== null) {
    newChildren.push(createQuestionAnswerItem(currentQuestion, currentContent))
  }

  // Replace the children with the new structure
  if (newChildren.length > 0) {
    node.children = newChildren
  }
}

/**
 * Creates a QuestionAnswerItem MDX component node
 */
function createQuestionAnswerItem(
  title: string,
  children: ElementContent[]
): MdxJsxFlowElementHast {
  const titleAttribute: MdxJsxAttribute = {
    type: "mdxJsxAttribute",
    name: "title",
    value: title,
  }

  return {
    type: "mdxJsxFlowElement",
    name: "QuestionAnswerItem",
    attributes: [titleAttribute],
    children,
    data: { _mdxExplicitJsx: true },
  }
}

/**
 * Extracts plain text content from an element and its children
 */
function extractTextContent(element: Element): string {
  let text = ""

  function traverse(node: ElementContent): void {
    if (node.type === "text") {
      text += (node as Text).value
    } else if ("children" in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child as ElementContent)
      }
    }
  }

  traverse(element)
  return text.trim()
}
