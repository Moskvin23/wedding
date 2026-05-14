import useScrollReveal from '../hooks/useScrollReveal'

function StorySection({ story }) {
  const ref = useScrollReveal()

  return (
    <section className="story-section">
      <div className="page-inner story-inner" ref={ref}>
        <p className="story-kicker">{story.kicker}</p>
        <h2 className="story-title">{story.title}</h2>
        <p className="story-lead">{story.lead}</p>
        <p className="story-body">{story.body}</p>
      </div>
    </section>
  )
}

export default StorySection
