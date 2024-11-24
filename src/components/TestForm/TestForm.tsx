import React, { memo, useState } from 'react'
import { Input, Space, Button } from 'antd'
import TestFormDisplay from '../TestFormDisplay/TestFormDisplay'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addCard, removeCard } from '../../store/slices/testSlice'
import { generationId } from '../../features/generationId'


const Description = styled.div`
	display: block;
	height: 20px;
	width: 100%;
	background-color: #fff;
	color: #000;
	font-family: 'Courier New', Courier, monospace;
`


const TestForm = () => {

	const { data } = useAppSelector(state => state.testStore)
	const dispatch = useAppDispatch()

	const [inputText, setInputText] = useState('')
	const [inputDescription, setDescription] = useState('')

	const buttonHandler = () => {
		const newCard = {
			id: +generationId(),
			text: inputText,
			description: inputDescription
		}
		dispatch(addCard(newCard))
		setInputText('')
		setDescription('')
	}



	console.log('render TestForm')

	return (
		<div>
			<Space.Compact style={{ width: '100%' }}>
				<Input
					placeholder="Enter text"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
				/>
				<Input
					placeholder="Enter text"
					value={inputDescription}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Button 
					type="primary"
					onClick={buttonHandler}
				> 
					Enter
				</Button>			
			</Space.Compact>

			<div>
				{
					data.map(card => (
						<TestFormDisplay key={card.id} text={card.text} desc={card.description} id={card.id} />
					))
				}
			</div>


			

		</div>

	)
}

export default TestForm