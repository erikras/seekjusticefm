type Props = { data: object };

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD has to be a raw script body. "<" is escaped before it is inserted.
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted structured data with escaped "<"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
