import '../styles/Member.css';
interface MemberProps
{
    image?: string,
    bod: boolean,
    committee: string,
    email: string,
    major: string,
    makeupHours: number,
    name: string,
    position: string,
    taskList: number[],
    profilePicture: string,
}


function Member (props: MemberProps)  {
    const {image, bod, committee, email, major, makeupHours, name, position, taskList, profilePicture} = props;
    
    return (
        <div className="Member">
            <img className="profilePicture" style={{width: '250px', height: '250px', objectFit: 'cover'}} src={image} ></img>
            <h2>{name}</h2>
            <h4 style={{fontWeight: 'normal'}}>
                {committee}
                <br/>{position}
                <br/>{major}
                <br/>{email}
            </h4>
        </div>
    )

}

export default Member;