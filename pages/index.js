import { Box, Slider, SliderTrack, SliderMark, CheckboxGroup, SliderFilledTrack, SliderThumb, RadioGroup, HStack, Checkbox, FormLabel, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Main = () => {
  const router = useRouter()
  const [sliderValue, setSliderValue] = useState()
  const [checkBoxValue, setCheckBoxValue] = useState()

  const handleClick = () => {
    router.push({
      pathname: '/table',
      query: { sliderValue, checkBoxValue }
    }, '/table')
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' h='100vh' bg='teal.50'>
      <Box maxW={650} w='50%' border='tan.100 1px solid' shadow='md' padding={14} bg='white'>
        <FormLabel mt={4} as='legend'>Chose the quantity of data to show</FormLabel>
        <Slider defaultValue={20} min={20} max={100} step={20} onChange={(e) => setSliderValue(e)}>
          <SliderMark value={20}>
            20
          </SliderMark>
          <SliderMark value={40}>
            40
          </SliderMark>
          <SliderMark value={60}>
            60
          </SliderMark>
          <SliderMark value={80}>
            80
          </SliderMark>
          <SliderMark value={100}>
            100
          </SliderMark>
          <SliderTrack bg='teal.500'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='teal.200' />
          </SliderTrack>
          <SliderThumb boxSize={6} />
          <Box></Box>
        </Slider>
        <FormLabel mt={4} as='legend'>Displayed Table Data</FormLabel>
        <CheckboxGroup defaultValue={['firstname', 'lastname']} onChange={e => setCheckBoxValue(e)}>
          <HStack spacing='24px'>
            <Checkbox value='firstname'>firstname</Checkbox>
            <Checkbox value='lastname'>lastname</Checkbox>
            <Checkbox value='email'>email</Checkbox>
          </HStack>
          <HStack spacing='24px'>
            <Checkbox value='phone'>phone</Checkbox>
            <Checkbox value='birthday'>birthday</Checkbox>
            <Checkbox value='gender'>gender</Checkbox>
          </HStack>
        </CheckboxGroup>
        <Button
          mt={4}
          colorScheme='teal'
          type='submit'
          variant={'outline'}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box >
    </Box >
  )
}

export default Main


