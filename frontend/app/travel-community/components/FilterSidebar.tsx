// app/travel-community/components/FilterSidebar.tsx
"use client";

export default function FilterSidebar() {
  return (
    <div className="rounded-[12px] border border-[rgba(45,64,87,0.1)] bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-4 flex items-center gap-2">排序方式</h3>
      <div className="space-y-2 mb-6">
        <RadioItem name="sort" label="最新" defaultChecked />
        <RadioItem name="sort" label="最熱門" />
        <RadioItem name="sort" label="最多哩程" />
      </div>

      <Field label="發佈時間">
        <Select options={["所有時間", "近 7 天", "近 30 天", "今年"]} />
      </Field>

      <Field label="獎勵哩程">
        <Select options={["不限", "1,000+", "5,000+", "10,000+"]} />
      </Field>

      <Field label="熱門標籤">
        <TagGroup tags={["潛水", "美食", "夜市", "賞櫻", "秘境", "滑雪"]} />
      </Field>

      <Field label="景點分類">
        <TagGroup tags={["遊樂園", "歷史古蹟", "動物園", "夜市", "博物館"]} />
      </Field>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="mb-6">
      <div className="text-sm font-semibold mb-2">{label}</div>
      {children}
    </div>
  );
}

function RadioItem({ name, label, defaultChecked = false }: any) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="radio" name={name} defaultChecked={defaultChecked} />
      <span>{label}</span>
    </label>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="h-10 w-full rounded-[8px] border px-3 text-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function TagGroup({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <button
          key={t}
          className="rounded-full border px-3 h-8 text-sm hover:border-[var(--sw-accent)]"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
