import '../styles/Member.css';
interface MemberProps
{
    bod: boolean,
    committee: string,
    email: string,
    major: string,
    makeupHours: number,
    name: string,
    position: string,
    taskList: number[]
}


function Member (props: MemberProps)  {
    const {bod, committee, email, major, makeupHours, name, position, taskList} = props;
    
    return (
        <div className="Member">
            <img src={require('../photos/directory_photo_neilkardan.jpg')}/>
            <h2>{name}</h2>
            <h3>
                {committee}
                <br/>{position}
                <br/>{major}
                <br/>{email}
            </h3>
        </div>
    )

}

export default Member;