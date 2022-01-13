import './index.css'

const Skills = props => {
  const {skillsDetails} = props

  return (
    <li className="skill-items-container">
      <img alt={skillsDetails.name} src={skillsDetails.imageUrl} />
      <p>{skillsDetails.name}</p>
    </li>
  )
}

export default Skills
