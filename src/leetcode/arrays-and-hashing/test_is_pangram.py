import pytest

# https://leetcode.com/problems/check-if-the-sentence-is-pangram

# letters = a-z (i.e. 26 different chars)

# Best Computational Runtime:
# runtime (n): usually need to check whole sentence
# space (1) if not counting output

# Solutions:

# brute
# runtime (n): check whole sentence for a, then b, then c ... etc. (26 times)
# space (1)

# cache hashmap / array / set
# runtime (n): check whole sentence
# space (1): store map of <=26 letters

# TODO Bit manipulation

test_cases = [
    ("thequickbrownfoxjumpsoverthelazydog", True),
    ("leetcode", False),
]


def char_to_index(char: str) -> int:
    return ord(char) - ord("a")


def is_pangram_brute(sentence: str) -> bool:
    CHARSET_SIZE = 26
    char_index_a = char_to_index("a")
    for expected_char_index in range(char_index_a, char_index_a + CHARSET_SIZE):
        found = False
        for char in sentence:
            if char_to_index(char) == expected_char_index:
                found = True
                break
        return found

    return True


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_is_pangram_brute(input, expected) -> None:
    assert is_pangram_brute(input) == expected


def is_pangram_cache_array(sentence: str) -> bool:
    CHARSET_SIZE = 26
    found_letters = [False] * CHARSET_SIZE

    for char in sentence:
        found_letters[char_to_index(char)] = True

    for letter in found_letters:
        if not letter:
            return False

    return True


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_is_pangram_cache_array(input, expected) -> None:
    assert is_pangram_cache_array(input) == expected


def is_pangram_hashmap(sentence: str) -> bool:
    found_letters = {}

    for char in sentence:
        found_letters[char] = True

    CHARSET_SIZE = 26
    return len(found_letters) == CHARSET_SIZE


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_is_pangram_hashmap(input, expected) -> None:
    assert is_pangram_hashmap(input) == expected


def is_pangram_set(sentence: str) -> bool:
    unique_chars = set(sentence)
    num_chars_occuring_at_least_once = len(unique_chars)

    CHARSET_SIZE = 26
    return num_chars_occuring_at_least_once == CHARSET_SIZE


@pytest.mark.parametrize(
    "input,expected",
    test_cases,
)
def test_is_pangram_set(input, expected) -> None:
    assert is_pangram_set(input) == expected
