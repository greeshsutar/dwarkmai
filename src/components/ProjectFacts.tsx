import { PROJECT } from '../data/project';
import './ProjectFacts.css';

export default function ProjectFacts() {
  return (
    <section className="project-facts section" id="project">
      <div className="container">
        <div className="project-facts__header">
          <span className="arch-label">PROJECT DATA</span>
          <div className="arch-divider"></div>
        </div>

        <div className="project-facts__grid">
          {PROJECT.facts.map((fact) => (
            <div key={fact.number} className="project-facts__item">
              <span className="project-facts__number">{fact.number}</span>
              <div className="project-facts__data">
                <span className="project-facts__value">{fact.label}</span>
                <span className="project-facts__unit">{fact.unit}</span>
              </div>
              <div className="project-facts__border"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
