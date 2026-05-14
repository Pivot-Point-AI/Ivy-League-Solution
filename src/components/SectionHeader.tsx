interface SectionHeaderProps {
  tag?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  titleHighlight,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      {tag && (
        <div className={`section-tag mb-4 ${centered ? "flex justify-center" : ""}`}>
          <span className="tag tag-gold">{tag}</span>
        </div>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 ${
          light ? "text-slate-900" : "text-white"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient-gold italic">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-slate-600" : "text-ivy-200/60"}`}
        >
          {description}
        </p>
      )}
      {centered && (
        <div className="flex justify-center mt-6">
          <div className="divider-gold" />
        </div>
      )}
    </div>
  );
}
