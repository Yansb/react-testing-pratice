import {Alert} from 'react-bootstrap';

export default function AlertBanner({message, variant}){
  const alertMessage = message || "An unexoected error ocurred. Please try again later.";
  const alertVariant = variant || 'danger';

  return(
    <Alert variant={variant} style={{backgroundColor: 'red'}}>
      {alertMessage}
    </Alert>
  )
}
