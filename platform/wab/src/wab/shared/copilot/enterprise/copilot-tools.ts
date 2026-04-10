import { z } from "zod";

type CopilotToolInputSchema = z.ZodTypeAny;
type CopilotStudioCtx = any;

export type CopilotToolDef<TInputSchema extends CopilotToolInputSchema> = {
  toolName: string;
  title: string;
  description: string;
  inputSchema: TInputSchema;
};

export type CopilotTool<TInputSchema extends CopilotToolInputSchema> =
  CopilotToolDef<TInputSchema> & {
    execute: (
      studioCtx: CopilotStudioCtx,
      input: z.infer<TInputSchema>
    ) => Promise<string>;
  };

const uuidSchema = z.string().min(1);

const projectReadSchema = z
  .object({
    components: z.boolean().optional(),
    screenBreakpoints: z.boolean().optional(),
    globalVariants: z.boolean().optional(),
    tokens: z.boolean().optional(),
  })
  .strict();

export const COPILOT_TOOL_DEFS = {
  insertHtml: {
    toolName: "insertHtml",
    title: "Insert HTML",
    description:
      "Insert an HTML snippet into a target component element at a relative position.",
    inputSchema: z
      .object({
        html: z.string().min(1),
        componentUuid: uuidSchema,
        tplUuid: uuidSchema,
        insertRelLoc: z
          .enum(["before", "prepend", "append", "after", "wrap"])
          .optional(),
        variantUuids: z.array(uuidSchema).optional(),
      })
      .strict(),
  },
  changeStyles: {
    toolName: "changeStyles",
    title: "Change Styles",
    description:
      "Apply CSS style changes to one or more elements in a component.",
    inputSchema: z
      .object({
        componentUuid: uuidSchema,
        variantUuids: z.array(uuidSchema).optional(),
        changes: z.array(
          z
            .object({
              tplUuid: uuidSchema,
              styles: z.record(z.string().nullable()),
            })
            .strict()
        ),
      })
      .strict(),
  },
  deleteElement: {
    toolName: "deleteElement",
    title: "Delete Element",
    description: "Delete a specific element from a component.",
    inputSchema: z
      .object({
        componentUuid: uuidSchema,
        tplUuid: uuidSchema,
      })
      .strict(),
  },
  read: {
    toolName: "read",
    title: "Read Project Data",
    description:
      "Read project metadata or serialize specific components, elements, and tokens by UUID.",
    inputSchema: z
      .object({
        project: projectReadSchema.optional(),
        components: z.array(uuidSchema).optional(),
        elements: z
          .array(
            z
              .object({
                componentUuid: uuidSchema,
                elementUuid: uuidSchema,
              })
              .strict()
          )
          .optional(),
        tokens: z.array(uuidSchema).optional(),
      })
      .strict(),
  },
} as const;

export function defineCopilotTool<TInputSchema extends CopilotToolInputSchema>(
  toolDef: CopilotToolDef<TInputSchema>,
  execute: (
    studioCtx: CopilotStudioCtx,
    input: z.infer<TInputSchema>
  ) => Promise<string>
): CopilotTool<TInputSchema> {
  return {
    ...toolDef,
    async execute(studioCtx, input) {
      const parsedInput = toolDef.inputSchema.parse(input);
      return execute(studioCtx, parsedInput);
    },
  };
}
