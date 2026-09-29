import { PROJECT } from '../data/project';
import './ProjectIntro.css';

export default function ProjectIntro() {
  return (
    <section className="project-intro section--large" id="project">
      <div className="container">
        <div className="project-intro__layout">
          <div className="project-intro__label">
            <span className="arch-number">01</span>
            <div className="arch-divider project-intro__divider"></div>
            <span className="arch-label">PROJECT</span>
          </div>

          <div className="project-intro__content">
            <h2 className="project-intro__name text-display">{PROJECT.name}</h2>
            <p className="project-intro__tagline font-editorial">
              {PROJECT.tagline}
            </p>
            <div className="project-intro__body">
              <p className="text-body">
                Set among the gentle hills of Sawantwadi, Dwarkamai is a residential address
                conceived with architectural care and a respect for its surroundings. Four buildings
                across 1.13 acres offer thoughtfully proportioned 01 and 02 BHK residences — each
                designed to bring in light, air, and a sense of openness that is rarely found in this region.
              </p>
              <p className="text-body">
                Developed by Darpan Constructions, Dwarkamai is guided by a belief that good homes
                are not about excess — they are about precision, proportion, and quiet attention to
                the way life is actually lived.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
