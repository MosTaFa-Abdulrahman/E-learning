import "./cool.scss";

const FeatureCard = ({ number, title, description }) => (
  <div className="feature-card">
    <div className="feature-card-number">{number}</div>
    <h3 className="feature-card-title">{title}</h3>
    <p className="feature-card-description">{description}</p>
  </div>
);

export default function Cool() {
  return (
    <div className="features-section">
      <h2 className="features-heading">🥰 ابدا رحلتك معنا</h2>
      <p className="features-subheading">
        نحن نقدم نهجا جديدا لنماذج التعلم الأساسية. اختر من بين مجموعة واسعة من
        خيارات التعلم واكتسب مهارات جديدة! مدرستنا معروفة.
      </p>
      <div className="features-cards">
        <FeatureCard
          number="01"
          title="لماذا منصة الباشا ؟"
          description="المنصة الاولى المعتمدة، توفر جميع احتياجات الطالب في مكان واحد، وفر وقتك..راجع دروسك..احضر امتحانات دورية ومستمرة..تواصل مع معلمك.الآن!"
        />
        <FeatureCard
          number="02"
          title="منصة متطورة وامتحانات دورية"
          description="دائمًا تجد كل ما هو جديد من شروحات ومحاضرات وأيضًا امتحانات الكترونية دورية ومستمرة"
        />
        <FeatureCard
          number="03"
          title="وفر وقتك"
          description="شروحات ومراجعات دائمة على المنصة مع امتحانات لتكون مستعد"
        />
        <FeatureCard
          number="04"
          title="نصنع الأوائل"
          description="أنضم إلينا كطالب وأستمتع بشروحات ومراجعات مادة الرياضيات وكن من الطلاب الأوائل معنا"
        />
      </div>
    </div>
  );
}
