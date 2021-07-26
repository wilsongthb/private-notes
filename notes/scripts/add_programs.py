from notes.models import Program, ProgramActivity


def run():
    list = [
        {'slug': "Rev. AI", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. AIIA", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. AIIB", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. AIIIA", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. AIIIB", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. AIIIC", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. AIV", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. BIIB", 'name ': "", 'days': 2, 'activity ': ""},
        {'slug': "Rev. BIIC", 'name ': "", 'days': 2, 'activity ': ""},

        {'slug': "Recat. AIIA", 'name ': "", 'days': 6, 'activity ': ""},
        {'slug': "Recat. AIIB", 'name ': "", 'days': 7, 'activity ': ""},
        {'slug': "Recat. AIIIB", 'name ': "", 'days': 8, 'activity ': ""},
        {'slug': "Recat. AIIIC", 'name ': "", 'days': 15, 'activity ': ""},

        {'slug': "Obt. BIIB", 'name ': "", 'days': 0, 'activity ': ""},
        {'slug': "Obt. BIIC", 'name ': "", 'days': 0, 'activity ': ""},

        {'slug': "Nuevo AI", 'name ': "", 'days': 0, 'activity ': ""},
        {'slug': "Nuevo A-IV", 'name ': "", 'days': 0, 'activity ': ""},
    ]
    for x in list:
        saveProgram(x)


def saveProgram(dict):
    program = Program(slug=dict['slug'], name=dict["slug"])
    program.save()
    if dict['days'] != 0:
        ProgramActivity(
            program=program, activity="$contactName paso el plazo", days=dict['days']).save()
    print(program)
