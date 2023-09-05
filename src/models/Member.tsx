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
    taskList: number[],
    profilePicture: string,
}


function Member (props: MemberProps)  {
    const {bod, committee, email, major, makeupHours, name, position, taskList, profilePicture} = props;
    
    return (
        <div className="Member">
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