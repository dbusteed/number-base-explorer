import React from 'react'

export default function CharacterBox(props) {
	return (
		<div className="character-box">
			{props.position}
			<div className="character-box-body">
				<span className="character">{props.char}</span>
			</div>
		</div>
	)
}